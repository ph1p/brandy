<template>
	<div id="app">
		<div class="titlebar">
			<div class="titlebar-stoplight">
				<div class="titlebar-close" @click="closeApp"></div>
				<div class="titlebar-minimize" @click="minApp"></div>
				<div class="titlebar-fullscreen" @click="maxApp"></div>
			</div>
		</div>
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import { remote, ipcRenderer } from 'electron';

import { addClass, removeClass, mainDir } from 'renderer/utils';

import { exec } from 'child_process';

import './scss/globals.scss';

const win = remote.getCurrentWindow();
const body = document.querySelector('body');

addClass(body, 'focus');
ipcRenderer.on('is-window-focused', () => {
  addClass(body, 'focus');
});
ipcRenderer.on('is-window-blurred', () => {
  removeClass(body, 'focus');
});

export default {
  methods: {
    closeApp() {
      remote.app.quit();
    },
    maxApp() {},
    minApp() {
      win.minimize();
    }
  },
  mounted() {}
};
</script>


<style lang="scss">
.titlebar {
  position: fixed;
  -webkit-app-region: drag;
  top: 0;
  height: 26px;
  z-index: 9999;
  background-color: #fff;
  padding: 6px 0 0 6px;
  width: 100%;
  border-bottom: 1px solid $lightGrey;

  .titlebar-close,
  .titlebar-fullscreen,
  .titlebar-minimize {
    -webkit-app-region: no-drag;
    float: left;
    margin: 1px 4px;
    background-repeat: no-repeat;
    background-size: auto 12px;
    width: 12px;
    height: 12px;
    border-radius: 6px;
  }
  &-status {
    position: absolute;
    right: 9px;
    top: 5px;
    font-size: 12px;
    & > div {
      &:before {
        content: '';
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 100%;
        left: -12px;
        top: 5px;
        background-color: #cd5656;
      }
    }
    &--online {
      & > div {
        &:before {
          background-color: #6edd5c;
        }
      }
    }
  }
}

.titlebar-stoplight {
  float: left;
}
.titlebar-stoplight:after,
.titlebar:after {
  content: ' ';
  display: table;
  clear: both;
}
.titlebar-stoplight:hover .titlebar-close {
  background-position: -26px 0;
}
.titlebar-stoplight:hover .titlebar-minimize {
  background-position: 0 0;
}
.titlebar-stoplight:hover .titlebar-fullscreen {
  background-position: -13px 0;
}
.titlebar.alt .titlebar-stoplight:hover .titlebar-close {
  background-position: -104px 0;
}
.titlebar.alt .titlebar-stoplight:hover .titlebar-minimize {
  background-position: -78px 0;
}
.titlebar.alt .titlebar-stoplight:hover .titlebar-fullscreen {
  background-position: -91px 0;
}

.titlebar-close {
  position: relative;
  margin-left: 6px;
  background-position: -65px 0;
}

.titlebar-fullscreen {
  position: relative;
  background-position: -52px 0;
}

.titlebar-minimize {
  position: relative;
  background-position: -39px 0;
}
.titlebar-close:active::after,
.titlebar-fullscreen:active::after,
.titlebar-minimize:active::after {
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  content: '';
  background: rgba(0, 0, 0, 0.25);
  border-radius: 100%;
}

.titlebar-close,
.titlebar-fullscreen,
.titlebar-minimize {
  background-color: #ddd;
}

body {
  &.focus {
    .titlebar {
      .titlebar-close,
      .titlebar-fullscreen,
      .titlebar-minimize {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAAAYCAYAAADwO7FhAAAABmJLR0QA/wD/AP+gvaeTAAAETUlEQVR42u2bz0tcVxTHP+e+NzMaf3U0IG1VmpIozSaii1JwkVIXbkIpXRS6Ke1/1k1poaWLbrJIQIpQKBiSTakGWtJq0VQTnYw/Zubde7p4jlozis48cyd6P4thmPfe3DOH833n3PPOiL13WzlHoulZARif+/xc13k49Y0AJJ99er6/59vvBcDd/zD47QzE3/0gACHezoY5zy8PBAKtEQQaCLQxQaCBQBsT+zYgRRHjQByCgsrBoUNvVR3OKk5rRKbHt9GBC8L6owUABm6N+TblJdpEoICCOsE5UOcQgVSdCggigmIQE2PI+bY2cIF49nARCAI9AUVdle3lVXZWnlN6soar1HCJQ51D7V6jTJSxrz5GjKS6PQM/3v8FgJmpSToL+Ybn7FSq3J2bB+CTjz7w6hF77zYAk16tCDRLVvHmbQ8q4gAHalGXIOoAsImlWtqlVtrF7lSxlQRXs7iq3S995XDdewbWNkvcnZtnp1I91llrmyVfLglcMLKIN38CNZa0hK1iqEFkuDI0QvHmCIPvXydf7MJWLTjqVS5qLXDm5Amkd7Krfb0NnXbYWVf7epmZCnkr0BpZxZu/Lq6kGXNraZXy0lNUO5BI6Rjoo/fGOxRvDtE9MvD/S8yeuU0otLOQb+i0Rs46riQJBE5LVvHmbQ+qLgLgxR8rJFsVCsVuCv09IEoUC33Xh5E4Rq1le6WEMYKzLhOn1R1Ur/+DOAPnQRbx9pJAHzxYZX5+tSmDJicHmZgYPN3JakChvLyOq1jKf6+DEXJXupEcxLkCve8OobYGGHb/3dzLoIKIok0OWB11GtCu4oyBxLcR582rirf1Rwv73drjePz1Tw0/7x8fbbrD22q8+eviSrqxTLZruMSy8fsy6ix9ox3kcjGgRPmIvtFriIlY3XjBQUW+tym92OS5BAINnMxLAp2YOEMWbIV6ClQFVbaWnwGKiXP0XHsbU+jCxAlxLqJ7eIDyUj8milpe9ugeAA66bW2WRS/FlNerireBW2PHZsF65rzxxZ3M12013jw2idIMqFZRp5icoVausLGwxObiE1xSSSeLVIm7ixTHhnjjvWGa6+E2dtbM1OSJ3TbPWN8GBFoji3jzfJdWTCT7e8tku0L5r3We/7ZEafFPkh2HTdLj3SPDdL35VqbO6izkj+22tQFtYUSgObKKN38C3Rs6UHcweKBOEREqG2We/vqY1Z/n2Vn5B1XBEaEYms2gJ7W2GzmtDQgZ9DUmq3jzJlBVAyKYfIzEgslHSCSYQkyUjxEjqBFczYGCiIAYwKTXNsFJ3bPDTgsEsiCLePM4i+sAw+iXd2j8zKQ+f1t/aa1re5rZ2s5C3vsMbuBikFW8eROoc1WMKSBRBZGIVJB6pILdK30x6WCDXvhHKwEP9I+P+jbhWLwJ1JgOANR2tNCXDQRapx3/ZlbnUjxrCwReV4JA25RoepZoeta3GQHPBIEGAm3MfxIveNEtAGhmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==');
      }

      .titlebar-close {
        background-color: #ff5f57;
      }

      .titlebar-minimize {
        background-color: #ffbd2e;
      }

      .titlebar-fullscreen {
        background-color: #28c940;
      }
    }
  }
}
</style>

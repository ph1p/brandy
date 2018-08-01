export const presets = [
  {
    info: {
      icon: 'instagram',
      title: 'Instagram',
      logo: 180,
      logo2: 95
    },
    measurements: {
      width: 1080,
      height: 1080,
    },
    font: {
      size: 120
    }
  },
  {
    info: {
      icon: 'instagram',
      title: 'Instagram big',
      logo: 180,
      logo2: 95,
    },
    measurements: {
      width: 1080,
      height: 1350
    },
    font: {
      fontSize: 120
    }
  },
  {
    info: {
      icon: 'twitter',
      title: 'Twitter header',
      logo: 220,
      logo2: 95,
    },
    measurements: {
      width: 1500,
      height: 500
    },
    font: {
      fontSize: 80
    }
  },
  {
    info: {
      icon: 'twitter',
      title: 'Twitter desktop grid',
      logo: 160,
      logo2: 95,
    },
    measurements: {
      width: 1200,
      height: 1200
    },
    font: {
      fontSize: 130
    }
  },
  {
    info: {
      icon: 'twitter',
      title: 'Twitter mobile grid',
      logo: 160,
      logo2: 95,
    },
    measurements: {
      width: 1200,
      height: 675
    },
    font: {
      fontSize: 110
    }
  },
  {
    info: {
      icon: 'twitter',
      title: 'Twitter appcard mit Bild',
      logo: 120,
      logo2: 95,
    },
    measurements: {
      width: 800,
      height: 320
    },
    font: {
      fontSize: 60
    }
  },
  {
    info: {
      icon: 'facebook',
      title: 'Facebook ad',
      logo: 160,
      logo2: 95,
    },
    measurements: {
      width: 1200,
      height: 628
    },
    font: {
      fontSize: 110
    }
  },
  {
    info: {
      icon: 'facebook',
      title: 'Facebook carousel',
      logo: 180,
      logo2: 95,
    },
    measurements: {
      width: 1080,
      height: 1080
    },
    font: {
      fontSize: 120
    }
  }
];

export const filterPresets = [
  {
    name: 'spotify',
    blur: 0,
    filters: [
      {
        color: '#08b76c',
        opacity: 1,
        mode: 'multiply'
      },
      {
        color: '#0a3463',
        opacity: 1,
        mode: 'lighten'
      }
    ]
  },
  {
    name: 'law&order',
    blur: 0,
    filters: [
      // {
      //   opacity: 1,
      //   mode: 'unset'
      // },
      {
        color: '#c35655',
        opacity: 1,
        mode: 'screen'
      }
    ]
  },
  {
    name: 'dark',
    blur: 0.1,
    filters: [
      {
        color: '#EF3340',
        opacity: 1,
        mode: 'darken'
      }
    ]
  }
];

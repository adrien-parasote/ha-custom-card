/****** COMPONENTS VERSION *******/
export const VERSION = "DEV";

/****** DEV HASS *******/
export const hass = {
  states: {
  },
};

/****** DEV CONFIG *******/
export const config = {
  actions: [
    {
      entity:"vacuum.dobby",
      // appearance
      icon:"an icon",
      name:"Clean daily",
      showState: true,
      // action on tap
      service: "xiaomi_miio.vacuum_clean_segment",
      service_data: { // optionnal
        segments: [17, 18],
      }
    },
    {
      entity:"automation.call_kids",
      // appearance
      icon:"an icon",
      name:"Call kids",
      showState: false,
      // action on tap
      service: "automation.trigger",
      service_data: {}
    }
  ]
};

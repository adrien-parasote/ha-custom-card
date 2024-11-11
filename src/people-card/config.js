/****** COMPONENTS VERSION *******/
export const VERSION = "DEV";

/****** DEV HASS *******/
export const hass = {
  states: {
    "punk.1": {
      state: "home",
      attributes: {
        editable: true,
        id: "punk2",
        device_trackers: ["device_tracker.ipad", "device_tracker.iphone"],
        latitude: 47.30682373046875,
        longitude: -1.5416121443667852,
        gps_accuracy: 7,
        source: "device_tracker.iphone",
        user_id: "user_id_punk_1",
        entity_picture: "/images/people.png",
        friendly_name: "Punk 1",
      },
    },

    "punk.2": {
      state: "Not home",
      attributes: {
        editable: true,
        id: "punk2",
        device_trackers: ["device_tracker.ipad", "device_tracker.iphone"],
        latitude: 47.30682373046875,
        longitude: -1.5416121443667852,
        gps_accuracy: 7,
        source: "device_tracker.iphone",
        user_id: "user_id_punk_2",
        entity_picture: "/images/people.png",
        friendly_name: "Punk 2",
      },
    },
  },
};

/****** DEV CONFIG *******/
export const config = {
  people: ["punk.1", "punk.2"],
};

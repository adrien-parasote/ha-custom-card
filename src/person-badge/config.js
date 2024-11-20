/****** COMPONENTS VERSION *******/
export const VERSION = "DEV";

/****** DEV HASS *******/
export const hass = {
  states: {
    "person.punk": {
      state: "home",
      attributes: {
        editable: true,
        id: "punk",
        device_trackers: ["device_tracker.ipad", "device_tracker.iphone"],
        latitude: 47.30682373046875,
        longitude: -1.5416121443667852,
        gps_accuracy: 7,
        source: "device_tracker.iphone",
        user_id: "user_id_punk",
        entity_picture: "/images/people.png",
        friendly_name: "Punk",
      },
    },
  },
};

/****** DEV CONFIG *******/
export const config = {
  entity: "person.punk",
};

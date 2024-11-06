export default {
  people: ["person.adrien", "person.virginie"],
  actions: [
    {
      icon: "mdi:bell-ring-outline",
      title: "Call kids",
      tap_action: {
        service: "automation.trigger",
        service_data: {
          entity_id: "automation.call_kids",
        },
      },
    },
    {
      icon: "mdi:door",
      title: "Clean entry",
      tap_action: {
        service: "xiaomi_miio.vacuum_clean_segment",
        service_data: {
          entity_id: "vacuum.dobby",
          segments: [17],
        },
      },
    },
    {
      icon: "mdi:broom",
      title: "Clean daily",
      tap_action: {
        service: "xiaomi_miio.vacuum_clean_segment",
        service_data: {
          entity_id: "vacuum.dobby",
          segments: [17, 18],
        },
      },
    },
    {
      icon: "mdi:silverware-fork-knife",
      title: "Clean kitchen",
      tap_action: {
        service: "xiaomi_miio.vacuum_clean_segment",
        service_data: {
          entity_id: "vacuum.dobby",
          segments: [17, 18],
        },
      },
    },
  ],
  info: [
    {
      icon: "an icon",
      title: "École",
      entity: "entity",
      secondary: "01/11/2024 14:18:33",
      data: {
        value: "on",
        render_type: "circle",
      },
    },
    {
      icon: "an icon",
      title: "Quantité pellet poêle",
      secondary: "01/11/2024 14:18:33",
      data: {
        value: "85",
        unit: "%",
        render_type: "graph",
      },
    },
    {
      icon: "an icon",
      title: "Sac pellet en stock",
      secondary: "01/11/2024 14:18:33",
      data: {
        value: "40",
        unit: "sac",
        threshold: 0.2,
        render_type: "graph",
      },
    },
    {
      icon: "an icon",
      title: "Intermarché",
      secondary: "01/11/2024 14:18:33",
      data: {
        value: "1.559 $",
        text: "E10",
        render_type: "text",
      },
    },
    {
      icon: "an icon",
      title: "Super U",
      secondary: "01/11/2024 14:18:33",
      data: {
        value: "1.559 $",
        text: "E10",
        render_type: "text",
      },
    },
  ],
};

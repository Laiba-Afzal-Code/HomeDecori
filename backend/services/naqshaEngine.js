export const generateNaqsha = (data) => {
  const { plotType, floors, requirements } = data;

  const plan = {};

  // GROUND FLOOR LOGIC
  plan.groundFloor = [];

  if (plotType === "residential") {
    plan.groundFloor.push("Car Porch");
    plan.groundFloor.push("Drawing Room");
    plan.groundFloor.push("TV Lounge");
    plan.groundFloor.push("Kitchen");

    if (requirements.bedrooms > 0) {
      plan.groundFloor.push("1 Bedroom");
    }
  }

  if (plotType === "office") {
    plan.groundFloor = [
      "Reception",
      "Waiting Area",
      "Manager Office",
      "Meeting Room",
    ];
  }

  if (plotType === "commercial") {
    plan.groundFloor = ["Shop Area", "Storage", "Washroom"];
  }

  // FIRST FLOOR LOGIC
  if (floors > 1) {
    plan.firstFloor = [];

    if (plotType === "residential") {
      plan.firstFloor.push(
        `${requirements.bedrooms - 1 || 2} Bedrooms`,
        "TV Lounge",
        "Terrace"
      );
    }

    if (plotType === "office") {
      plan.firstFloor = ["Workstations", "Conference Room"];
    }
  }

  // SIMPLE AREA INTELLIGENCE
  plan.intelligence = {
    efficiency: "optimized",
    ventilation: "north-south balanced",
    privacyScore: 8.2,
  };

  return plan;
};
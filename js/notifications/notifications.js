var notifications = {
  pupUpNotification(item) {
    if (
      FLOATING_NOTIFICATIONS &&
      ((item.alarmTriggered == 1 && item.Status == 9) ||
        (item.alarmTriggered == 1 &&
          item.Status == 2 &&
          alarmData[parseInt(item.alarmId)].alarmType == 1))
    ) {
      const alarmId = parseInt(item.alarmId);
      const alarm = alarmData[alarmId];
      const alarmName = alarm?.alarmDescription || "Unnamed Alarm";

      let alarmType = typeof item.alarmType !== "undefined" ? parseInt(item.alarmType) : alarm?.alarmType;

      let notificationColor = "orange";
      let notificationIcon = "error";
      let notificationGroup = "alarms";
      let notificationMessage = "New Pre-Alarm";

      if (alarmType == 0) {
        notificationColor = "red";
        notificationIcon = "warning";
        notificationGroup = "pre-alarms";
        notificationMessage = "New Alarm";
      }

      if (typeof Quasar !== "undefined" && Quasar.Notify) {
        Quasar.Notify.create({
          color: notificationColor,
          message: `${notificationMessage}: ${alarmName}`,
          icon: notificationIcon,
          position: "top",
          timeout: 3000,
          group: notificationGroup,
        });
      } else {
        console.warn("Quasar.Notify is not defined. Cannot create notification.");
      }
    }
  },
};

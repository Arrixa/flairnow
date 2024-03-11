function shouldPublishNow(selectedDate: Date): boolean {
  const currentDate = new Date();
  return selectedDate <= currentDate;
}

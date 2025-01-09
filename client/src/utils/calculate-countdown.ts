interface TrashedForm {
  trashedAt: Date;
}

export const calculateCountdown = (trashedForm: TrashedForm) => {
  const trashedAtTime = trashedForm.trashedAt.getTime();
  const deletionTime = trashedAtTime + 2 * 60 * 1000; // 2 minutes
  const currentTime = new Date().getTime();
  const countdownTime = deletionTime - currentTime;

  if (countdownTime <= 0) {
    return "Deleted";
  }

  const minutes = Math.floor(countdownTime / (60 * 1000));
  const seconds = Math.floor((countdownTime % (60 * 1000)) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

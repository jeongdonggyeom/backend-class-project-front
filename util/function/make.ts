export const makeDate = (date: Date) => {
  const save = date.toLocaleString().replaceAll(".", "").split(" ");
  const newDate = save[0] + "-" + save[1].padStart(2, "0") + "-" + save[2].padStart(2, "0");
  return newDate
}

export const makeName = (name: string) => {
  if (name === "P") return "보";
  else if (name === "R") return "바위";
  else return "가위";
}
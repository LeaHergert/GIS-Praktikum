let add: HTMLElement = document.getElementById("add");
add.addEventListener("click", changeBGColor);
function changeBGColor(event: Event): void {
  let randomColor: string = Math.floor(Math.random() * 0xffffff).toString(16);
  event.currentTarget.addEventListener
  ;
}
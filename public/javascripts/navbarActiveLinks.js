const currentLocation = location.href;
const menuItems = document.querySelectorAll("a");

for (let item of menuItems) {
  if (item.href === currentLocation) {
    item.className += " active";
  }
}

const mobileSidebar = document.getElementById('mobileSidebar')
const closeBtn = document.getElementById('closeBtn')
const openBtn = document.getElementById('openBtn')

function openMobileNav() {
  mobileSidebar.style.width = "250px";

}

function closeMobileNav() {
  mobileSidebar.style.width = '0'
}

openBtn.addEventListener('click', openMobileNav)
closeBtn.addEventListener('click', closeMobileNav)
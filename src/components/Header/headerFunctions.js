export const openSidebar = (setSidebarOpen) => {
  document.getElementById('mySidebar').style.width = '25%';
  document.getElementById('mySidebar').classList.add('w3-show');
  document.getElementById('openNav').style.display = 'none';
  setSidebarOpen(true);
};

export const closeSidebar = (setSidebarOpen) => {
  document.getElementById('mySidebar').classList.remove('w3-show');
  document.getElementById('openNav').style.display = 'inline-block';
  setSidebarOpen(false);
};

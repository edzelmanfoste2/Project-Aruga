document.addEventListener('DOMContentLoaded', () => {
    // Select all category headers
    const headers = document.querySelectorAll('.category-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const parent = header.closest('.filter-category');
            
            parent.classList.toggle('active');
        });
    });
});

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside the container
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function clearCheckListFunction() {
    const checkboxes = document.querySelectorAll('.category-checklist input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

    // LOGOUT MODAL
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutModal = document.getElementById("logoutModal");
    const confirmLogout = document.getElementById("confirmLogout");
    const cancelLogout = document.getElementById("cancelLogout");

    // Show popup
    logoutBtn.addEventListener("click", function(e){
        e.preventDefault();
        logoutModal.classList.add("show");
    });

    // YES → go to login.html
    confirmLogout.addEventListener("click", function(){
        window.location.href = "login.html";
    });

    // NO → close popup
    cancelLogout.addEventListener("click", function(){
        logoutModal.classList.remove("show");
    });
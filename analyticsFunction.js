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
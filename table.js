// table.js
    (function() {
        // ---- DOM elements
        const filterBtn = document.getElementById('filterBtn');
        const filterPanel = document.getElementById('mainFilterPanel');
        const filterDropdown = document.getElementById('filterDropdown');
        const searchInput = document.getElementById('searchInput');
        const clearBtn = document.getElementById('clearBtn');
        const dataTable = document.getElementById('dataTable');
        const rows = dataTable.getElementsByTagName('tr');

        // ---- 1. CLICK TOGGLE for main filter dropdown
        filterBtn.addEventListener('click', function(e) {
            e.stopPropagation();  // avoid triggering document click immediately
            filterPanel.classList.toggle('show');
        });

        // ---- 2. Close when clicking outside
        document.addEventListener('click', function(event) {
            // if the click is outside the filterDropdown container, hide panel
            if (!filterDropdown.contains(event.target)) {
                filterPanel.classList.remove('show');
            }
        });

        // Prevent clicks inside panel from closing it (stopPropagation not strictly needed because we check container, but harmless)
        filterPanel.addEventListener('click', function(e) {
            e.stopPropagation();  // keeps event from reaching document click
        });

        // ---- 3. Category headers toggle nested checklist
        const categoryHeaders = document.querySelectorAll('.category-header');
        categoryHeaders.forEach(header => {
            header.addEventListener('click', function(e) {
                e.stopPropagation();  // keep inside panel
                const targetId = this.dataset.target;
                const checklist = document.getElementById(targetId);
                if (checklist) {
                    checklist.classList.toggle('show');
                    const indicator = this.querySelector('.category-indicator');
                    if (checklist.classList.contains('show')) {
                        indicator.innerHTML = '▲';
                    } else {
                        indicator.innerHTML = '▼';
                    }
                }
            });
        });

        // ---- 4. Clear all checkboxes
        const clearAllBtn = document.getElementById('clearAllBtn');
        clearAllBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const checkboxes = document.querySelectorAll('.filter-dropdown input[type="checkbox"]');
            checkboxes.forEach(cb => cb.checked = false);
            const othersInput = document.getElementById('relOthersInput');
            if (othersInput) othersInput.value = '';
        });

        // ---- 5. Apply button (demo)
        const applyBtn = document.getElementById('applyFilterBtn');
        applyBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('Filters applied (demo). In real scenario table would filter.');
            // optionally close panel: filterPanel.classList.remove('show');
        });

        // ---- 6. Add "others" religion
        document.getElementById('addOthersBtn')?.addEventListener('click', function(e) {
            e.stopPropagation();
            const othersInput = document.getElementById('relOthersInput');
            const newReligion = othersInput.value.trim();
            if (newReligion === '') return;
            const religionChecklist = document.getElementById('religion-checklist');
            const newDiv = document.createElement('div');
            newDiv.className = 'checkbox-item';
            const randomId = 'rel_' + Date.now() + Math.floor(Math.random()*1000);
            newDiv.innerHTML = `<input type="checkbox" value="${newReligion}" id="${randomId}"><label for="${randomId}">${newReligion}</label>`;
            const othersRow = document.querySelector('.others-row');
            religionChecklist.insertBefore(newDiv, othersRow);
            othersInput.value = '';
        });

        // ---- 7. Search / filter table function
        window.filterTable = function() {
            const filter = searchInput.value.toLowerCase();
            
            if (filter.length > 0) {
                clearBtn.style.display = "flex";
            } else {
                clearBtn.style.display = "none";
            }

            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName("td");
                let found = false;
                const searchCols = [0, 2, 3, 4, 5, 6];  // Name, Contact, Address
                
                for (let colIndex of searchCols) {
                    if (cells[colIndex]) {
                        const textValue = cells[colIndex].textContent || cells[colIndex].innerText;
                        if (textValue.toLowerCase().indexOf(filter) > -1) {
                            found = true;
                            break;
                        }
                    }
                }
                rows[i].style.display = found ? "" : "none";
            }
        };

        window.clearSearch = function() {
            searchInput.value = "";
            filterTable();
            searchInput.focus();
        };

        searchInput.addEventListener("keyup", filterTable);
        // initial clear button state
        if(searchInput.value.length>0) clearBtn.style.display='flex';
        else clearBtn.style.display='none';

    // ---- 8. ensure user dropdown stays hover (already ok)
    })();

    // USER DROPDOWN CLICK TOGGLE
    const userBtn = document.getElementById("userBtn");
    const userPanel = document.getElementById("userPanel");
    const userDropdown = document.getElementById("userDropdown");

    userBtn.addEventListener("click", function(e){
        e.stopPropagation();
        userPanel.classList.toggle("show");
    });

    document.addEventListener("click", function(event){
        if(!userDropdown.contains(event.target)){
            userPanel.classList.remove("show");
        }
    });

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


    let currentPage = 1;
    const rowsPerPage = 10;
    const totalRecords = 200;

    function showPage(page){

    const table = document.getElementById("dataTable");
    const rows = table.getElementsByTagName("tr");

    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    if(page < 1) page = 1;
    if(page > totalPages) page = totalPages;

    currentPage = page;

    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;

    for(let i = 0; i < rows.length; i++){

        if(i >= start && i < end){
            rows[i].style.display = "";
        }else{
            rows[i].style.display = "none";
        }

    }

    // UPDATE TITLE
    let startRecord = start + 1;
    let endRecord = start + rowsPerPage;

    if(endRecord > totalRecords){
        endRecord = totalRecords;
    }

    const title = document.getElementById("tableTitle");

    if(title){
        title.innerText =
        "Summary of Informations (Showing " + startRecord + "-" + endRecord + " of " + totalRecords + ")";
    }

    }

    function nextPage(){
        showPage(currentPage + 1);
    }

    function prevPage(){
        showPage(currentPage - 1);
    }

    function goToPage(page){
        showPage(page);
    }

    // run when page loads
    window.onload = function(){
        showPage(1);
    }
        

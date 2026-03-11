// table.js
(function() {
    // ---- DOM elements
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearBtn');
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');
    
    // Side menu elements
    const filterBtn = document.getElementById('filterBtn');
    const sideMenu = document.getElementById('sideMenu');
    const toggleBtn = document.getElementById('toggleSideMenu');

    // ---- Toggle side menu
    if (filterBtn) {
    // Set initial toggle button state
    if (toggleBtn) {
        toggleBtn.innerHTML = sideMenu.classList.contains('collapsed') ? '▶' : '◀';
    }
    
    filterBtn.addEventListener('click', function() {
        sideMenu.classList.toggle('collapsed');
        // Change toggle button icon based on state
        if (sideMenu.classList.contains('collapsed')) {
            toggleBtn.innerHTML = '▶';
        } else {
            toggleBtn.innerHTML = '◀';
        }
    });
    }

    // ---- Toggle button inside side menu
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sideMenu.classList.toggle('collapsed');
            if (sideMenu.classList.contains('collapsed')) {
                toggleBtn.innerHTML = '▶';
            } else {
                toggleBtn.innerHTML = '◀';
            }
        });
    }

    // ---- Category headers toggle nested checklist
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.stopPropagation();
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

    // ---- Clear all checkboxes
    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const checkboxes = document.querySelectorAll('.side-menu input[type="checkbox"]');
            checkboxes.forEach(cb => cb.checked = false);
            
            // Clear all others inputs
            const othersInputs = document.querySelectorAll('.side-menu .others-row input[type="text"]');
            othersInputs.forEach(input => input.value = '');
        });
    }

    // ---- Apply button
    const applyBtn = document.getElementById('applyFilterBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('Filters applied (demo). In real scenario table would filter.');
        });
    }

    // ---- Add "others" functionality for each category
    // Religion
    document.getElementById('addReligionBtn')?.addEventListener('click', function(e) {
        e.stopPropagation();
        const othersInput = document.getElementById('relOthersInput');
        const newReligion = othersInput.value.trim();
        if (newReligion === '') return;
        const religionChecklist = document.getElementById('religion-checklist');
        const newDiv = document.createElement('div');
        newDiv.className = 'checkbox-item';
        const randomId = 'rel_' + Date.now() + Math.floor(Math.random()*1000);
        newDiv.innerHTML = `<input type="checkbox" value="${newReligion}" id="${randomId}"><label for="${randomId}">${newReligion}</label>`;
        const othersRow = document.querySelector('#religion-checklist .others-row');
        religionChecklist.insertBefore(newDiv, othersRow);
        othersInput.value = '';
    });

    // IP Membership
    document.getElementById('addIPBtn')?.addEventListener('click', function(e) {
        e.stopPropagation();
        const othersInput = document.getElementById('ipOthersInput');
        const newIP = othersInput.value.trim();
        if (newIP === '') return;
        const ipChecklist = document.getElementById('ipmembership-checklist');
        const newDiv = document.createElement('div');
        newDiv.className = 'checkbox-item';
        const randomId = 'ip_' + Date.now() + Math.floor(Math.random()*1000);
        newDiv.innerHTML = `<input type="checkbox" value="${newIP}" id="${randomId}"><label for="${randomId}">${newIP}</label>`;
        const othersRow = document.querySelector('#ipmembership-checklist .others-row');
        ipChecklist.insertBefore(newDiv, othersRow);
        othersInput.value = '';
    });

    // Critical Illness
    document.getElementById('addIllBtn')?.addEventListener('click', function(e) {
        e.stopPropagation();
        const othersInput = document.getElementById('illOthersInput');
        const newIll = othersInput.value.trim();
        if (newIll === '') return;
        const illChecklist = document.getElementById('illness-checklist');
        const newDiv = document.createElement('div');
        newDiv.className = 'checkbox-item';
        const randomId = 'ill_' + Date.now() + Math.floor(Math.random()*1000);
        newDiv.innerHTML = `<input type="checkbox" value="${newIll}" id="${randomId}"><label for="${randomId}">${newIll}</label>`;
        const othersRow = document.querySelector('#illness-checklist .others-row');
        illChecklist.insertBefore(newDiv, othersRow);
        othersInput.value = '';
    });

    // ---- Search / filter table function
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
            const searchCols = [0, 4]; // Name and Address columns
            
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
    
    // Initial clear button state
    if (searchInput.value.length > 0) {
        clearBtn.style.display = 'flex';
    } else {
        clearBtn.style.display = 'none';
    }

    // ---- User dropdown toggle
    const userBtn = document.getElementById("userBtn");
    const userPanel = document.getElementById("userPanel");
    const userDropdown = document.getElementById("userDropdown");

    if (userBtn) {
        userBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            userPanel.classList.toggle("show");
        });
    }

    document.addEventListener("click", function(event) {
        if (userDropdown && !userDropdown.contains(event.target)) {
            userPanel.classList.remove("show");
        }
    });

    // ---- LOGOUT MODAL
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutModal = document.getElementById("logoutModal");
    const confirmLogout = document.getElementById("confirmLogout");
    const cancelLogout = document.getElementById("cancelLogout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(e) {
            e.preventDefault();
            logoutModal.classList.add("show");
        });
    }

    if (confirmLogout) {
        confirmLogout.addEventListener("click", function() {
            window.location.href = "login.html";
        });
    }

    if (cancelLogout) {
        cancelLogout.addEventListener("click", function() {
            logoutModal.classList.remove("show");
        });
    }

    // ---- PAGINATION
    let currentPage = 1;
    const rowsPerPage = 10;
    const table = document.getElementById("dataTable");
    const allRows = table.getElementsByTagName("tr");
    const totalRecords = allRows.length;

    window.showPage = function(page) {
        const totalPages = Math.ceil(totalRecords / rowsPerPage);

        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;

        currentPage = page;

        let start = (page - 1) * rowsPerPage;
        let end = start + rowsPerPage;

        for (let i = 0; i < allRows.length; i++) {
            if (i >= start && i < end) {
                allRows[i].style.display = "";
            } else {
                allRows[i].style.display = "none";
            }
        }

        let startRecord = start + 1;
        let endRecord = start + rowsPerPage;
        if (endRecord > totalRecords) {
            endRecord = totalRecords;
        }

        const title = document.getElementById("tableTitle");
        if (title) {
            title.innerText = `Summary of Informations (Showing ${startRecord}-${endRecord} of ${totalRecords})`;
        }

        const pgButtons = document.querySelectorAll('.pg-btn');
        pgButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === String(page)) {
                btn.classList.add('active');
            }
        });
    };

    window.nextPage = function() {
        showPage(currentPage + 1);
    };

    window.prevPage = function() {
        showPage(currentPage - 1);
    };

    window.goToPage = function(page) {
        showPage(page);
    };

    // Initialize on load
    window.onload = function() {
        showPage(1);
    };
})();
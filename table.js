import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from "./firebase-config.js"; 

async function loadTableData() {
    const dataTable = document.getElementById('dataTable');
    
    // Clear the table before loading new data
    dataTable.innerHTML = ""; 

    try {
        const querySnapshot = await getDocs(collection(db, "Profile"));
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // Access the nested child_profile object
            const child = data.child_profile || {};
            
            // Format the Timestamp into a readable Date (MM/DD/YYYY)
            let formattedDOB = 'N/A';
            if (child.date_of_birth) {
                // Handle both native Firestore Timestamps and raw objects
                if (typeof child.date_of_birth.toDate === 'function') {
                    formattedDOB = child.date_of_birth.toDate().toLocaleDateString();
                } else if (child.date_of_birth.seconds) {
                    formattedDOB = new Date(child.date_of_birth.seconds * 1000).toLocaleDateString();
                }
            }

            // Combine address and barangay if available
            let fullAddress = data.address || 'N/A';
            if (data.barangay && fullAddress === 'N/A') fullAddress = data.barangay;

            const tr = document.createElement("tr");
            
            // Map the data perfectly to your table columns
            tr.innerHTML = `
                <td>${child.name || 'N/A'}</td>
                <td>${formattedDOB}</td>
                <td>${child.sex || 'N/A'}</td>
                <td>N/A</td> <td>${fullAddress}</td>
                <td>${child.religion || 'N/A'}</td>
                <td>${child.ip_membership || 'N/A'}</td>
                <td>${child.disability_special_needs || 'N/A'}</td>
                <td>${child.critical_illness || 'N/A'}</td>
                <td><a href="profile.html?id=${doc.id}" class="check-btn">Check Information</a></td>
            `;
            
            dataTable.appendChild(tr);
        });

        // Re-run the pagination so the table organizes the rows correctly
        if (typeof window.showPage === "function") {
            window.showPage(1);
        }

    } catch (error) {
        console.error("Error connecting to Firebase:", error);
    }
}

// Run the function on load
loadTableData();
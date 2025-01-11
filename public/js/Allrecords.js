function SearchFunction() {
    var input = document.querySelector("#searchInput");
    var filter = input.value.toUpperCase(); 
    var table = document.querySelector(".records-table");
    var rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) { 
        var cells = rows[i].getElementsByTagName("td");
        let rowContainsQuery = false;

        for (let j = 0; j < cells.length - 1; j++) { 
            let cellValue = cells[j].textContent || cells[j].innerText;
            if (cellValue.toUpperCase().indexOf(filter) > -1) {
                rowContainsQuery = true;
                break;
            }
        }

        rows[i].style.display = rowContainsQuery ? "" : "none";
    }
}



//  // setting Date format
//  function formatDate(dateString) {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     if (isNaN(date)) return ''; // Return empty if the date is invalid
//     return date.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD'
// }


// Display the uploaded documents as a link if they exist
// const documentFields = ['Document1Name', 'Document2Name', 'Document3Name', 'Document4Name'];

// documentFields.forEach((field, index) => {
//     const linkElement = document.getElementById(`docLink${index + 1}`);
//     if (data[field]) {
//         linkElement.href = data[field];
//         linkElement.style.display = 'inline';
//     } else {
//         linkElement.style.display = 'none';
//     }
// });
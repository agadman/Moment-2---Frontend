// Hämtar data från webbtjänsten/via API:et
fetch(API_BASE_URL)
  .then(res => res.json()) // Tolkar svaret som JSON
  .then(data => {
    const list = document.getElementById("experienceList"); // Hämtar listan (ul) där datan (arbetserfarenheter) ska visas

    // Loopar igenom varje arbetserfarenhet och lägger till dem i listan
    data.forEach(item => {
      const li = document.createElement("li"); // Skapar ett nytt li-element

      const start = formatDate(item.startdate); // Formaterar startdatum (funktion nedan)
      const end = formatDate(item.enddate); // Formaterar slutdatum (funktion nedan)
      // Skapar text i listan, inklusive en knapp för Delete
      li.innerHTML = `${item.companyname} – ${item.jobtitle} (${start} till ${end})<br>${item.description} <br><button class="delete-button" data-id="${item.id}">Ta bort</button>`;
      list.appendChild(li); // Lägger till li i listan
    });

     // Lägger till eventlyssnare på alla "Ta bort"-knappar
    document.querySelectorAll(".delete-button").forEach(button => {
      button.addEventListener("click", async (e) => {
        const id = e.target.dataset.id; // Hämtar id:t från knappen

        // Frågar användaren om de verkligen vill ta bort
        if (confirm("Vill du verkligen ta bort den här erfarenheten?")) {
          try {
            // Skickar DELETE-förfrågan till API:t
            const res = await fetch(`${API_BASE_URL}/${id}`, {
              method: "DELETE"
            });
            // Om allt gick bra, ta bort li-elementet från listan 
            if (res.ok) {
              e.target.parentElement.remove(); 
            } else {
              // Om något gick fel, visa felmeddelande
              const errData = await res.json();
              alert("Fel vid borttagning: " + errData.error);
            }
          } catch (err) {
            // Andra fel som kan uppstå t.ex. om man är offline
            console.error("Något gick fel vid borttagning:", err);
          }
        }
      });
    });
  })
  .catch(err => console.error("Fel vid hämtning:", err)); // Visar fel om hämtningen misslyckas

// Funktion för att formatera datum till YYYY-MM-DD, utan klocksskag
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; 
}
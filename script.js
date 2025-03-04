// Fetching data from data.json
fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    // Get all bar elements
    const chart = document.getElementById('chart');
    const bars = chart.getElementsByClassName('bar');

    // Iterate through bars and set their height and tooltip dynamically
    Array.from(bars).forEach((bar, index) => {
      const expense = data[index].amount;
      const day = data[index].day;

      // Set height based on expense
      const maxExpense = Math.max(...data.map((item) => item.amount));
      bar.style.height = `${(expense / maxExpense) * 150}px`;

      // Create tooltip element
      const tooltip = document.createElement('span');
      tooltip.classList.add('tooltip');
      tooltip.innerText = `$${expense.toFixed(2)}`;
      bar.appendChild(tooltip);

      // Add hover effect to display tooltip
      bar.addEventListener('mouseenter', () => {
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
      });

      bar.addEventListener('mouseleave', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
      });

      // Highlight the current day bar dynamically
      if (day === new Date().toLocaleString('en-US', { weekday: 'short' }).toLowerCase()) {
        bar.classList.add('current-day');
      }
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

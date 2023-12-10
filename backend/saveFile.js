const fs=require('fs');
const events="Hi radha"
fs.writeFileSync('events.json', JSON.stringify(events));

// Read events from the JSON file
const readEvents = JSON.parse(fs.readFileSync('events.json', 'utf-8'));

// Display events in the frontend
readEvents.forEach(event => {
  console.log(`ID: ${event.Id}, Name: ${event.Name}, Date: ${event.Date}, Time: ${event.Time}`);
});
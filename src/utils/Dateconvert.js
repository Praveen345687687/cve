export function Dateconvert(dateString) {
    var originalDatetime = new Date(dateString);

    // Define options for formatting
    var options = { month: 'short', day: '2-digit', year: 'numeric' };

    // Format the date according to the desired format
    var formattedDate = originalDatetime.toLocaleDateString('en-US', options);

    // Replace the comma with an empty string
    formattedDate = formattedDate.replace(',', '');

    // Split the formatted date string by space
    var parts = formattedDate.split(' ');

    // Rearrange the parts to get the desired format "11 May 2024"
    var rearrangedDate = parts[1] + '  ' + parts[0] + '  ' + parts[2];

    return rearrangedDate;
}
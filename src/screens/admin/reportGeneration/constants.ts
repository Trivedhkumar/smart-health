export const html = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Metrics Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f5f5; /* Teal background color */
      color: #333; /* Text color */
      padding: 20px;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: #fff; /* White background color */
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Soft shadow effect */
    }

    h1, h2, h3 {
      color: #008080; /* Teal color for headings */
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      padding: 10px;
      border: 1px solid #ddd; /* Light gray border */
    }

    th {
      background-color: #008080; /* Teal color for table headers */
      color: #fff; /* White text color */
    }

    tr:nth-child(even) {
      background-color: #f2f2f2; /* Light gray background color for even rows */
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Metrics Report</h1>
    <p>This report provides an overview of the performance metrics.</p>

    <h2>Summary Metrics</h2>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total Revenue</td>
          <td>$10,000</td>
        </tr>
        <tr>
          <td>Number of Customers</td>
          <td>100</td>
        </tr>
        <tr>
          <td>Conversion Rate</td>
          <td>20%</td>
        </tr>
      </tbody>
    </table>

    <h2>Detailed Metrics</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Visitors</th>
          <th>Conversion Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2024-01-01</td>
          <td>500</td>
          <td>15%</td>
        </tr>
        <tr>
          <td>2024-01-02</td>
          <td>600</td>
          <td>18%</td>
        </tr>
        <tr>
          <td>2024-01-03</td>
          <td>550</td>
          <td>17%</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
`;

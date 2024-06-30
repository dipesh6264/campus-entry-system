function domReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }
  
  domReady(function () {
    const loginForm = document.getElementById('login-form');
    const guardActions = document.getElementById('guard-actions');
    const qrSection = document.getElementById('qr-section');
    const qr = document.getElementById('my-qr-reader');
    const scanButton = document.getElementById('scan-button');
    const showDataButton = document.getElementById('show-data-button');
    const scanResult = document.getElementById('scan-result');
    const dataResult = document.getElementById('data-result');
    const showCabDriverFormButton = document.getElementById('show-cab-driver-form-button');
    const cabDriverForm = document.getElementById('cab-driver-form');

    document.getElementById('login-button').addEventListener('click', async () => {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      const response = await fetch('/guard/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      if (response.ok) {
        guardActions.style.display = 'block';
        loginForm.style.display = 'none';
      } else {
        alert('Invalid username or password.');
      }
    });
  
    let isScanning = false; // Variable to control scanning state
  
      scanButton.addEventListener('click', () => {
      scanResult.innerHTML = '';
      dataResult.innerHTML = '';
      cabDriverForm.style.display = 'none';
      qrSection.style.display = 'block';
  
      function onScanSuccess(decodedText, decodedResult) {
        if (isScanning) return; // Ignore scans if already processing
        isScanning = true;
  
        fetch('/guard/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ qrData: decodedText })
        })
          .then(response => response.json())
          .then(data => {
            if (!data.name) {
              scanResult.innerHTML = `<span class="invalid-user">Invalid user</span>`;
            } else {
              scanResult.innerHTML = `
                Type: ${data.typeof} <br>
                Name: ${data.name}<br>
                ID: ${data.rollNo}<br>
                <span class="verified-user">User Verified</span>
              `;
            }
  
            setTimeout(() => {
              scanResult.innerHTML = '';
              isScanning = false; // Re-enable scanning after delay
            }, 5000); // Clear scan result after 5 seconds
          })
          .catch(error => {
            console.error('Error:', error);
            isScanning = false; // Re-enable scanning in case of error
          });
      }
  
      let html5QrCodeScanner = new Html5QrcodeScanner(
        "my-qr-reader", { fps: 10, qrbox: 250 }
      );
      html5QrCodeScanner.render(onScanSuccess);
    });
  
    showDataButton.addEventListener('click', async () => {
      qrSection.style.display = 'none';
      cabDriverForm.style.display = 'none';
      scanResult.innerHTML = '';
      dataResult.innerHTML = '';
  
      const response = await fetch('/guard/data');
      const data = await response.json();
  
      if (data.length === 0) {
        dataResult.innerHTML = 'No scan logs found.';
      } else {
        let tableHTML = `
          <h2>Scan Logs</h2>
          <table id="scan-logs-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Type</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
        `;
  
        data.forEach(log => {
          tableHTML += `
            <tr>
              <td>${log.userName}</td>
              <td>${log.rollNumber}</td>
              <td>${log.typeof}</td>
              <td>${new Date(log.scanTime).toLocaleString()}</td>
            </tr>
          `;
        });
  
        tableHTML += `
            </tbody>
          </table>
        `;
  
        dataResult.innerHTML = tableHTML;
      }
    });

    showCabDriverFormButton.addEventListener('click', () => {
      qrSection.style.display = 'none';
      scanResult.innerHTML = '';
      dataResult.innerHTML = '';
      cabDriverForm.style.display = 'block';
    });
  });
  
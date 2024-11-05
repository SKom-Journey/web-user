export default function openPrintQrPage(content: string) {
    const printWindow = window.open("", "_blank");
        if (printWindow) {
        printWindow.document.write(`
            <html>
                <head>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <title>Print QR Code</title>
                    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet">
                </head>
                <body class="flex items-center justify-center h-screen">
                    ${content}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}
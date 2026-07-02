import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
function ModalQR({ isOpen, handleClosePopup, payloadQR, targetQR, amountQR }) {
  const qrRef = useRef(null);

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const qrImageUrl = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = qrImageUrl;
    downloadLink.download = `promptpay-${targetQR}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs text-center shadow-2xl relative border border-gray-100">
            <button
              onClick={handleClosePopup}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl font-semibold transition-colors"
            >
              &times;
            </button>

            <h3 className="text-lg font-bold text-gray-800 mb-4">
              สแกนเพื่อชำระเงิน
            </h3>

            <div
              ref={qrRef}
              className="flex justify-center bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4"
            >
              <QRCodeCanvas value={payloadQR} size={160} includeMargin={true} />
            </div>

            <div className="text-left bg-gray-50 p-3 rounded-lg text-xs space-y-1 text-gray-600 border border-gray-100 mb-4">
              <div>
                <span className="font-semibold text-gray-700">พร้อมเพย์:</span>{" "}
                {targetQR}
              </div>
              <div>
                <span className="font-semibold text-gray-700">จำนวนเงิน:</span>{" "}
                <span className="text-blue-600 font-bold text-sm">
                  {amountQR
                    ? `${Number(amountQR).toLocaleString()} บาท`
                    : "ผู้โอนระบุยอดเงินเอง"}
                </span>
              </div>
            </div>

            <button
              onClick={handleDownloadQR}
              className="w-full py-2 mb-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow transition-colors duration-150 flex items-center justify-center gap-2"
            >
              ดาวน์โหลดรูปภาพ QR
            </button>

            <button
              onClick={handleClosePopup}
              className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-150"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalQR;

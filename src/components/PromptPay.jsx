import { useState } from "react";
import { anyId } from "promptparse/generate";
import ModalQR from "./ModalQR";

function PromptPay() {
  const [targetInput, setTargetInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [error, setError] = useState("");

  // state for modal
  const [isOpen, setIsOpen] = useState(false);
  const [payloadQR, setPayloadQR] = useState("");
  const [targetQR, setTargetQR] = useState("");
  const [amountQR, setAmountQR] = useState("");

  const handleOpenPopup = (e) => {
    e.preventDefault();
    setError("");

    // ล้างขีดกลาง (-)
    const cleanTarget = targetInput.replace(/-/g, "").trim();

    // ตรวจสอบความยาวว่าครบ 10 หรือ 13 หรือไม่ หลังลบขีดกลาง (-)
    if (
      !cleanTarget ||
      (cleanTarget.length !== 10 && cleanTarget.length !== 13)
    ) {
      setError(
        "กรุณากรอกเบอร์โทร 10 หลัก หรือ เลขบัตรประชาชน 13 หลัก ให้ถูกต้อง",
      );
      return;
    }

    // ตรวจสอบว่าใส่จำนวนเงินเป็น ลบ หรือไม่ เนื่องจากเป็นลบจะไม่สามารถใช้งานได้
    if (amountInput && parseFloat(amountInput) < 0) {
      setError("กรุณากรอกจำนวนเงินให้ถูกต้อง (ไม่ติดลบ)");
      return;
    }

    try {
      /**
       * idType
       * MSISDN เบอร์โทร
       * NATID เลขบัตรประชาชน
       */
      const idType = cleanTarget.length === 10 ? "MSISDN" : "NATID";

      const payload = anyId({
        type: idType,
        target: cleanTarget,
        amount: amountInput ? Number(amountInput) : undefined,
      });

      // set state show qr code
      setPayloadQR(payload);
      setTargetQR(cleanTarget);
      setAmountQR(amountInput);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถสร้าง QR Code ได้ กรุณาตรวจสอบข้อมูล");
    }
  };

  const handleClosePopup = () => {
    setIsOpen(false);
    setPayloadQR("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          PromptPay QR Generator
        </h2>

        <form onSubmit={handleOpenPopup} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              พร้อมเพย์ (เบอร์โทร/เลขบัตรประชาชน):
            </label>
            <input
              type="text"
              value={targetInput}
              onChange={(e) =>
                setTargetInput(e.target.value.replace(/[^0-9+-]/g, ""))
              }
              placeholder="08XXXXXXXX หรือ เลขบัตร 13 หลัก"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              จำนวนเงิน (บาท):
            </label>
            <input
              type="number"
              value={amountInput}
              min="0"
              step="any"
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="ปล่อยว่างได้ หากให้ผู้โอนระบุเอง"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors duration-200"
          >
            สร้าง QR Code
          </button>
        </form>
      </div>
      <ModalQR
        isOpen={isOpen}
        handleClosePopup={handleClosePopup}
        payloadQR={payloadQR}
        amountQR={amountQR}
        targetQR={targetQR}
      />
    </div>
  );
}

export default PromptPay;

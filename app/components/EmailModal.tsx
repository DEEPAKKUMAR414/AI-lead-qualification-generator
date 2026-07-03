type Props = {
  email: string;
  onClose: () => void;
};

export default function EmailModal({
  email,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white w-[700px] rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          🤖 AI Generated Email
        </h2>

        <textarea
          value={email}
          readOnly
          className="w-full h-80 border rounded-lg p-4"
        />

        <div className="flex gap-3 mt-4">

          <button
            onClick={() => navigator.clipboard.writeText(email)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            📋 Copy
          </button>
          <button
            onClick={() => {
            window.location.href = `mailto:?subject=Project Proposal&body=${encodeURIComponent(email)}`;
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            📧 Send Email
        </button>  
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}
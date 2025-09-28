import Link from "next/link";

export default function SetupRemoved() {
  return (
    <div className="p-4">
      <p>No setup required. This app runs locally in your browser.</p>
      <a className="btn btn-primary mt-4 inline-block" href="/">
        Go to Dashboard
      </a>
    </div>
  );
}

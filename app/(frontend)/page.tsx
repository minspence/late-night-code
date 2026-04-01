import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Late Night Code</h1>
      <hr />
      <Link href="https://midnight-code.tech">Back to Home</Link>
      <Link href="/posts">View posts &rarr;</Link>
    </div>
  );
}

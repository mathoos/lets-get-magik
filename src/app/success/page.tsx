"use client";

export default function SuccessPage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Paiement réussi ! 🎉</h1>
      <p className="text-lg">Merci pour votre achat. Votre paiement a été traité avec succès.</p>
      <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">
        Retourner à la boutique
      </a>
    </div>
  );
}

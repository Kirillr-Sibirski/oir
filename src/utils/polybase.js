import { Polybase } from "@polybase/client";

const db = new Polybase({
    defaultNamespace: "pk/0x1a6c79251b93767e1e8e59cc42bca0763771d1cb5f4bf9a2bc4a5a4087c9aead10d570559f5637bf120fcce35d4ef63239d2f9f3b38e1a2d6a46764dfb39d0ac/StoreAttestations",
});

const collectionReference = db.collection("attestations");

export async function addAttestation(uid, rank) {
    collectionReference.create(
    [
      uid, 
      rank 
    ]
  );
};

export async function getAllRecords() {
    const records = await collectionReference.get();
    return records.data;
}
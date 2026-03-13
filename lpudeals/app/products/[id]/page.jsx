'use client'
import ItemDetails from "@/components/ItemDetails";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
    const params = useParams();

    return (
        <ItemDetails id={params.id} />
    );
}

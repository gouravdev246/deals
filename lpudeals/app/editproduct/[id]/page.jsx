import EditProduct from "../../../components/EditProduct";

export default async function EditProductPage({ params }) {
    const { id } = await params;
    return (
        <EditProduct productId={id} />
    );
}

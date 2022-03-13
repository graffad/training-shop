
export default function Step2({register,errors}) {
    return (
        <>
            <input  {...register("example")} />
            <input  {...register("example2", { required: true }) } />
            {errors.example2 && <span>This field is required</span>}
        </>
    );
}



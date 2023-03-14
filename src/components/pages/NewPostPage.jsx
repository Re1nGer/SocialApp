import { axios } from "../../axios";
import NewPostForm from "../newpost/NewPostForm";

const NewPostPage = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const body = { };
            await axios.post();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Section>
            <NewPostForm onSubmit={handleSubmit} />
        </Section>
    );
}


const Section = ({ children }) => {
    return <div style={{maxWidth: '1440px', width: '100%', height: '100%', margin: '0 auto'}}>
        { children }
    </div>
}

export default NewPostPage;
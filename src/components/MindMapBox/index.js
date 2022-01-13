import { Box } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

export default styled(Box) (
    () => {
    return {
        // display: 'flex',
        justifyContent: 'space-between',
        background: 'white'
    }
});
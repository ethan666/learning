<script>
import { Statistic, Icon } from 'ant-design-vue'

export default {
    name: 'RenderT1',
    components: {
        Statistic,
        AIcon: Icon
    },
    render(){
        const props = {
            title: 'Feedback',
            value: 1128,
            style: "margin-right: 50px"
        }

        const scopedSlots = {
            suffix: scope => (<a-icon type="like" />)
        }

        return (
            // <statistic {...props}></statistic>
            <statistic {...{ props, scopedSlots }}></statistic>
        )
    }
    
}
</script>

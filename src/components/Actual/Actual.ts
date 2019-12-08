import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './Actual.html';
import { mapGetters } from 'vuex';
import { Category, Item } from '@/expense-types/category';

@WithRender
@Component({
    computed: {
        ...mapGetters(['categoryList'])
      }
})
export default class Actual extends Vue {
    private categoryList!: Array<Category>;
    private selectedCategName: String = '';
    private itemModel: Item = new Item();
    public categIndex: number = -1;

    @Watch('categoryList')
    selectedCateg(categ: Category): void {
        this.selectedCategName = categ.name;
        this.categIndex = this.categoryList.findIndex((el) => el.name === categ.name)
    }

    public emitCategItems(): void {
        let categItem = this.itemModel;
        this.$parent.$emit('item', categItem, this.selectedCategName);
        this.onDestroy();
      }

      private onDestroy(): void {
        this.itemModel = new Item();
   }
}

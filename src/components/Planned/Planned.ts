import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './Planned.html';
import { Category } from '@/expense-types/category';
import { mapState, mapGetters } from 'vuex';

@WithRender
@Component({
  computed: {
    ...mapGetters(['categoryList'])
  }
})
export default class Planned extends Vue {
     private categoryModel: Category;
     private categoryList!: Array<Category>;
    normal: String = '';
  
    constructor() {
        super();
        this.categoryModel = new Category();
    }

  public emitCategDetails(): void {
    let categDt = this.categoryModel;
    this.$parent.$emit('category', categDt);
    this.onDestroy();
  }

   private onDestroy(): void {
        this.categoryModel = new Category();
   }
}
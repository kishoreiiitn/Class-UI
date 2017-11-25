import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import { Layout, Section } from './Layout';

export interface IProps {
	order: {
		key: string
		title: string
	}[]

	canDelete?: boolean
	onDelete?: (id: string)=>void
};
export interface IState {
	order: IProps['order']
}

export class OrderedMapList extends React.Component<IProps, IState> {
	static defaultProps: Partial<IProps> = {
		canDelete: true
	}
	constructor(props: IProps, context: any) {
		super(props, context);
		this.getOrder = this.getOrder.bind(this);
		this.moveDown = this.moveDown.bind(this);
		this.moveUp = this.moveUp.bind(this);
		this.state = {
			order: props.order
		};
	}
	getOrder() {
		return _.map(this.state.order, "key")
	}
	private moveDown(index: number) {
		let order = _.cloneDeep(this.state.order);
		let temp = _.cloneDeep(order[index]);
		order[index] = order[index+1];
		order[index+1] = temp;
		this.setState({order});
	}
	private moveUp(index: number) {
		let order = _.cloneDeep(this.state.order);
		let temp = _.cloneDeep(order[index]);
		order[index] = order[index-1];
		order[index-1] = temp;
		this.setState({order});
	}
	render() {
		let order = this.state.order.map((item, i)=>{
			let index = i;
			let up = <span className="button" style={{
				visibility: (index!=0)?"visible":"hidden"
			}} onClick={()=>this.moveUp(index)}><i className="fa fa-long-arrow-up"></i></span>;

			let down = <span className="button" style={{
				visibility: (index!=this.state.order.length-1)?"visible":"hidden"
			}} onClick={()=>this.moveDown(index)}>
				<i className="fa fa-long-arrow-down"></i>
			</span>;

			return <Layout cls="item" key={item.key} align="center" style={{height: 50}}>
				<Section>
					{item.title}
				</Section>
				<Section remain />
				<Section>
					{up}
					{down}
					{this.props.canDelete?<span style={{marginLeft: 10}} className="button primary" onClick={()=>{
						this.props.onDelete?this.props.onDelete(item.key):null
					}}>
						<i className="fa fa-trash"></i>
					</span>:null}
				</Section>
			</Layout>
		})
		return <div className="sidemenu">
			{order}
		</div>;
	}
}
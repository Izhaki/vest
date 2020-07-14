import { connect } from 'react-redux';
import Stats from './Stats';

const mapStateToProps = ({ stats }) => ({
  stats,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);

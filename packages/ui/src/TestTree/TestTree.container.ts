import { connect } from 'react-redux';
import { runStep } from '@vest/core/store/actions';
import TestTree from './TestTree';

const mapStateToProps = ({ steps }) => ({
  steps,
});

const mapDispatchToProps = { runStep };

export default connect(mapStateToProps, mapDispatchToProps)(TestTree);

import { PulseLoader } from 'react-spinners'
import styles from './Spinner.module.css'

export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <PulseLoader size="15px" color="#ddd8d8" />
    </div>
  )
}

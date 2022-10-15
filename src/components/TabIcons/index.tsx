import React from 'react';
import { View, Image } from 'react-native';
import Svg, { Rect, Path, Circle} from 'react-native-svg'

import { styles } from './styles';

interface HomeIconProps {
  color: string,
  size: number
}
interface SearchIconProps{
  color: string,
  size: number
}
interface OrderIconProps{
  color: string,
  size: number
}
interface ProfileIconProps{
  color: string,
  size: number
}


function HomeIcon(props: HomeIconProps) {
  return (
    <Svg width={props.size} height={props.size} viewBox={`0 0 ${props.size} ${props.size}`} fill="none">
      <Rect width={props.size} height={props.size} fill="transparent"/>
      <Path d="M16.5367 5.20668L6.65508 12.9067C5.00508 14.19 3.66675 16.9217 3.66675 18.9933V32.5783C3.66675 36.8317 7.13175 40.315 11.3851 40.315H32.6151C36.8684 40.315 40.3334 36.8317 40.3334 32.5967V19.25C40.3334 17.0317 38.8484 14.19 37.0334 12.925L25.7034 4.98668C23.1367 3.19001 19.0117 3.28168 16.5367 5.20668Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M22 16.5V33M13.75 24.75H30.25M19.25 33H24.75C27.775 33 30.25 30.525 30.25 27.5V22C30.25 18.975 27.775 16.5 24.75 16.5H19.25C16.225 16.5 13.75 18.975 13.75 22V27.5C13.75 30.525 16.225 33 19.25 33Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
    )
}
function SearchIcon(props: SearchIconProps){ 
  return (
    <Svg width={props.size} height={props.size} viewBox={`0 0 ${props.size} ${props.size}`} fill="none">
      <Path d="M25.6666 9.16669H36.6666M25.6666 14.6667H31.1666M38.5 21.0834C38.5 30.7084 30.7083 38.5 21.0833 38.5C11.4583 38.5 3.66663 30.7084 3.66663 21.0834C3.66663 11.4584 11.4583 3.66669 21.0833 3.66669M40.3333 40.3334L36.6666 36.6667" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  )
}
function OrderIcon(props: OrderIconProps){ 
  return (
    <Svg width={props.size} height={props.size} viewBox={`0 0 ${props.size} ${props.size}`} fill="none">
      <Path d="M28.8751 16.5H15.1251M28.8751 27.5H15.1251M16.5001 40.3333H27.5001C36.6667 40.3333 40.3334 36.6667 40.3334 27.5V16.5C40.3334 7.33332 36.6667 3.66666 27.5001 3.66666H16.5001C7.33341 3.66666 3.66675 7.33332 3.66675 16.5V27.5C3.66675 36.6667 7.33341 40.3333 16.5001 40.3333Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  )
}
function ProfileIcon(props: ProfileIconProps){ 
  return (
    <Svg width={27} height={39} viewBox={`0 0 27 39`} fill="none">
      <Path d="M13.4942 17.263C13.3108 17.2447 13.0908 17.2447 12.8892 17.263C10.7849 17.1915 8.79101 16.3039 7.32982 14.7879C5.86863 13.272 5.05486 11.2468 5.06083 9.14132C5.06083 4.64966 8.69083 1.00132 13.2008 1.00132C14.2686 0.982062 15.3297 1.1733 16.3235 1.56412C17.3174 1.95494 18.2245 2.53768 18.9932 3.27908C19.7618 4.02048 20.3769 4.90601 20.8033 5.88512C21.2297 6.86423 21.4591 7.91773 21.4783 8.98549C21.4976 10.0532 21.3064 11.1143 20.9155 12.1082C20.5247 13.102 19.942 14.0092 19.2006 14.7778C18.4592 15.5465 17.5736 16.1615 16.5945 16.5879C15.6154 17.0143 14.5619 17.2437 13.4942 17.263V17.263ZM4.3275 24.028C-0.109167 26.998 -0.109167 31.838 4.3275 34.7897C9.36917 38.163 17.6375 38.163 22.6792 34.7897C27.1158 31.8197 27.1158 26.9797 22.6792 24.028C17.6558 20.673 9.3875 20.673 4.3275 24.028V24.028Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  )
}
export { HomeIcon, SearchIcon, OrderIcon, ProfileIcon }
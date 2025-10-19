interface ContextMenuProps {
  isVisible: ()=> boolean;
  onClose: ()=> void;
  onOpen: ()=> void;
  onAction: (action: string)=> void;
}

export default function ContextMenu() {

}


import { useState } from "react";
import { useGrocery, GroceryItem } from "@/contexts/GroceryContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatCurrency } from "@/utils/currency";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GroceryItemForm } from "./GroceryItemForm";
import { Edit, GripVertical, MoreHorizontal, Trash } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface GroceryItemTableProps {
  listId: string;
  items: GroceryItem[];
  onDelete?: (id: string) => void;
  isCreatePage?: boolean;
  onReorder?: (items: GroceryItem[]) => void;
  onUpdate?: (item: GroceryItem) => void;
}

interface SortableRowProps {
  item: GroceryItem;
  isEnglish: boolean;
  onEdit: (item: GroceryItem) => void;
  onDelete: (id: string) => void;
}

function SortableRow({ item, isEnglish, onEdit, onDelete }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "var(--accent)" : undefined,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className="group">
      <TableCell className="w-[50px]">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-grab active:cursor-grabbing touch-none"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </TableCell>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell className="text-center">
        {item.quantity} {item.unit}
      </TableCell>
      <TableCell className="text-right">
        {item.estimatedPrice ? formatCurrency(item.estimatedPrice, 'BDT') : "N/A"}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">{isEnglish ? "Open menu" : "মেনু খুলুন"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(item)}>
              <Edit className="mr-2 h-4 w-4" /> {isEnglish ? "Edit" : "সম্পাদনা"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(item.id)}>
              <Trash className="mr-2 h-4 w-4" /> {isEnglish ? "Delete" : "মুছুন"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export function GroceryItemTable({
  listId,
  items,
  onDelete,
  isCreatePage = false,
  onReorder,
  onUpdate
}: GroceryItemTableProps) {
  const {
    removeItemFromList,
    reorderItemsInList
  } = useGrocery();
  const {
    language,
    isEnglish
  } = useLanguage();
  const [editItem, setEditItem] = useState<GroceryItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleEdit = (item: GroceryItem) => {
    setEditItem(item);
  };

  const handleDelete = async (itemId: string) => {
    setItemToDelete(null);
    if (isCreatePage && onDelete) {
      onDelete(itemId);
    } else {
      try {
        await removeItemFromList(listId, itemId);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      if (isCreatePage && onReorder) {
        // For create page, use the callback
        onReorder(newItems);
      } else {
        // For existing lists, update through context
        try {
          await reorderItemsInList(listId, newItems);
        } catch (error) {
          console.error("Error reordering items:", error);
        }
      }
    }
  };

  return (
    <div className="rounded-md border">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="text-center">{isEnglish ? "Item" : "আইটেম"}</TableHead>
              <TableHead className="text-center">{isEnglish ? "Quantity" : "পরিমাণ"}</TableHead>
              <TableHead className="text-right">{isEnglish ? "Est. Price" : "অনু. মূল্য"}</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {isEnglish ? "No items added to this list yet." : "এই তালিকায় এখনও কোন আইটেম যোগ করা হয়নি।"}
                </TableCell>
              </TableRow>
            ) : (
              <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {items.map((item) => (
                  <SortableRow
                    key={item.id}
                    item={item}
                    isEnglish={isEnglish}
                    onEdit={handleEdit}
                    onDelete={(id) => setItemToDelete(id)}
                  />
                ))}
              </SortableContext>
            )}
          </TableBody>
        </Table>
      </DndContext>

      {/* Edit Item Dialog */}
      <Dialog open={!!editItem} onOpenChange={open => !open && setEditItem(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEnglish ? "Edit Item" : "আইটেম সম্পাদনা করুন"}</DialogTitle>
          </DialogHeader>
          {editItem && <GroceryItemForm
            listId={listId}
            item={editItem}
            onSubmit={(updatedItem) => {
              if (isCreatePage && onUpdate && updatedItem) {
                onUpdate(updatedItem);
              }
              setEditItem(null);
            }}
            isCreatePage={isCreatePage}
          />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!itemToDelete} onOpenChange={open => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{isEnglish ? "Are you sure?" : "আপনি কি নিশ্চিত?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {isEnglish ? "This action cannot be undone. This will permanently delete the item from your grocery list." : "এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না। এটি আপনার মুদি তালিকা থেকে আইটেমটি স্থায়ীভাবে মুছে ফেলবে।"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{isEnglish ? "Cancel" : "বাতিল"}</AlertDialogCancel>
            <AlertDialogAction onClick={() => itemToDelete && handleDelete(itemToDelete)} className="text-gray-50 bg-orange-600 hover:bg-orange-500">
              {isEnglish ? "Delete" : "মুছুন"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

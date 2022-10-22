import { Component, OnInit, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoItemNode } from "src/app/models/todoItem.model";
import { TodoItemFlatNode } from "src/app/models/todoItemFlatNode.model";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from "@angular/material/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { EtapasService } from "src/app/etapas.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

const TREE_DATA = {
  Groceries: {
    "Almond Meal flour": null,
    "Organic eggs": null,
    "Protein Powder": null,
    Fruits: {
      Apple: null,
      Berries: ["Blueberry", "Raspberry"],
      Orange: null,
    },
  },
  Reminders: [
    "Cook dinner",
    "Read the Material Design spec",
    "Upgrade Application to Angular",
  ],
};

@Injectable()
export class ChecklistDb {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor() {}

  initialize() {
    const data = this.buildFileTree(TREE_DATA, 0);
    this.dataChange.next(data);
  }

  
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === "object") {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  buildFileTreeFromService(data): TodoItemNode[] {
    return data;
  }

  inicializarData(tasks: TodoItemNode[]) {
    const data = this.buildFileTreeFromService(tasks);
    this.dataChange.next(data);
  }

  persistir() {}
  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ item: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-certificables',
  templateUrl: './certificables.component.html',
  styleUrls: ['./certificables.component.scss'],
  providers: [ChecklistDb],
})
export class CertificablesComponent implements OnInit {
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  selectedParent: TodoItemFlatNode | null = null;

  newItemName = "";

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);

  constructor(
    private route: ActivatedRoute,
    private taskService: EtapasService,
    private router: Router,
    private _database: ChecklistDb
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    _database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  estadoId: string;
  etapaId: string;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.estadoId = params.estadoId;
      this.etapaId = params.etapaId;
      this.taskService
        .getCertificables(this.estadoId)
        .subscribe((tasks: TodoItemNode[]) => {
          this._database.inicializarData(tasks);
          for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].children) {
              for (let j = 0; j < tasks[i].children.length; j++) {
                const cadaEstado = tasks[i].children[j];
                if (cadaEstado.seleccionado) {
                  for (let k = 0; k < this.treeControl.dataNodes.length; k++) {
                    if (this.treeControl.dataNodes[k].id === cadaEstado.id) {
                      this.todoItemSelectionToggle(
                        this.treeControl.dataNodes[k]
                      );
                    }
                  }
                }
              }
            }
          }
        });
    });
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.item === "";

  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.id = node.id;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    descendants.every((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every((child) =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, "");
    this.treeControl.expand(node);
  }

  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }

  guardar() {
    var estadosSeleccionados = new Array();
    for (
      let index = 0;
      index < this.checklistSelection.selected.length;
      index++
    ) {
      const element = this.checklistSelection.selected[index];
      if (element.level == 1) {
        estadosSeleccionados.push(Number(element.id));
      }
    }

    const payload = {
      estadoOrigen: Number(this.estadoId),
      estadosMarcados: estadosSeleccionados,
    };

    this.taskService.postCertificables(this.estadoId, payload).subscribe(() => {
      this.router.navigate(["/etapas", this.etapaId]);
    });
  }
}

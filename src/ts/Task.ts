type TaskQueen = {
  excute?: () => Promise<void>;
  success?: () => void;
  error?: (args: any) => void;
};
class Task<T = {}> {
  private queen: Array<T & TaskQueen>;
  private max: number;
  private useing = 0;
  constructor(max: number) {
    this.max = max;
    this.queen = [];
  }

  addTask(t: T & TaskQueen) {
    const { queen } = this;
    queen.push(t);
    this.startNextTask();
  }

  protected startNextTask() {
    const { useing, max, queen } = this;
    //没有任务处理
    if (!queen.length) return;
    // 超出最大并行任务阻塞等待
    if (useing >= max) return;
    console.log(useing, max, queen);
    this.useing++;
    //删除第一个元素并返回它
    const task = queen.shift();
    if (task) {
      const { excute, success, error } = task;
      try {
        console.log("start task");
        excute?.()
          .then(() => {
            success?.();
          })
          .catch((e) => error?.(e))
          .finally(() => {
            console.log("end task", this.useing);
            this.useing--;
            setTimeout(() => this.startNextTask());
          });
      } catch (e) {
        error?.(e);
      }
    }
  }
}

class DefalutTask<T = {}> extends Task<T> {}

export default DefalutTask;

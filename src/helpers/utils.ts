export async function mergeSubmastersFunc(mergeSubmastersID: object, Master: any) {
    const submasters = await Master.find({ _id: { $in: mergeSubmastersID } }).select('names name');

    const namesSet: Set<string> = new Set();
  
    submasters.forEach((submaster: any) => {
      if (submaster.names) {
        Object.values(submaster.names || {}).forEach((masterName) => {
          namesSet.add(masterName as string);
        });
      }
  
      if (submaster.name) {
        namesSet.add(submaster.name);
      }
    });
  
    const namesArr = Array.from(namesSet);

    return namesArr;
  }
  
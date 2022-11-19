import torchvision
import inspect
structure = \
""" 
{{
    "l": "{label1}",
    "s": "{label}",
    "doc": "{doc}"
}},"""
output = ""
for func in dir(torchvision.transforms):
    label1 = "transforms."+func+"()"
    label = "transforms."+func+"("
    func = (torchvision.transforms).__dict__[func]
    try:
        ins = inspect.getfullargspec(func)
        args = ins.args[1:]
        for i,arg in enumerate(args,1):
            label+="${{{0}:{1}}}".format(i,arg)
            label+=("," if i != len(args) else "")
        doc = func.__doc__.split("\n")[0]
        label+=")"
        a = structure.format(label1=label1,label=label,doc=doc)
        # print(a)
        output+=a
    except:
        pass
        # print(label)
        # print(func.__doc__.split("\n")[0])
    
# print(dir(torchvision.transforms))
# print((torchvision.transforms).__dict__)
# print(torchvision.transforms.CenterCrop.__doc__)
# ins = inspect.getfullargspec(torchvision.transforms.RandomResizedCrop)
# print(ins.args[1:-len(ins.defaults)])
print(output)